/*
 * Copyright (c) 2016, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var modalPopup = ".modal";
var modalPopupContainer = modalPopup + " .modal-content";
var modalPopupContent = modalPopup + " .modal-content";
var body = "body";

/*
 * set popup maximum height function.
 */
function setPopupMaxHeight() {
    $(modalPopupContent).css('max-height', ($(body).height() - ($(body).height() / 100 * 30)));
    $(modalPopupContainer).css('margin-top', (-($(modalPopupContainer).height() / 2)));
}

/*
 * show popup function.
 */
function showPopup() {
    $(modalPopup).modal('show');
    setPopupMaxHeight();
    $('#downloadForm').validate({
        rules: {
            deviceName: {
                minlength: 4,
                required: true
            }
        },
        highlight: function (element) {
            $(element).closest('.control-group').removeClass('success').addClass('error');
        },
        success: function (element) {
            $(element).closest('.control-group').removeClass('error').addClass('success');
            $('label[for=deviceName]').remove();
        }
    });
    var deviceType = "";
    $('.deviceType').each(function () {
        if (this.value != "") {
            deviceType = this.value;
        }
    });
    if (deviceType == 'digitaldisplay'){
        $('.sketchType').remove();
        $('input[name="sketchType"][value="digitaldisplay"]').prop('checked', true);
        $("label[for='digitaldisplay']").text("Simple Agent");
    }else{
        $('.sketchTypes').remove();
    }
}

/*
 * hide popup function.
 */
function hidePopup() {
    $('label[for=deviceName]').remove();
    $('.control-group').removeClass('success').removeClass('error');
    $(modalPopupContent).html('');
    $(modalPopup).modal('hide');
}

/*
 * DOM ready functions.
 */
$(document).ready(function () {
    attachEvents();
});

function attachEvents() {
    /**
     * Following click function would execute
     * when a user clicks on "Download" link
     * on Device Management page in WSO2 DC Console.
     */
    $("a.download-link").click(function () {
        var sketchType = $(this).data("sketchtype");
        var deviceType = $(this).data("devicetype");
        var downloadDeviceAPI = "/devicemgt/api/devices/sketch/generate_link";
        var payload = {"sketchType": sketchType, "deviceType": deviceType};
        $(modalPopupContent).html($('#download-device-modal-content').html());
        showPopup();
        $("a#download-device-cancel-link").click(function () {
            hidePopup();
        });

    });
}

function downloadAgent() {
    var deviceName;
    $('.new-device-name').each(function () {
        if (this.value != "") {
            deviceName = this.value;
        }
    });
    var deviceNameFormat = /^[^~?!#$:;%^*`+={}\[\]\\()|<>,'"]{1,30}$/;
    if (deviceName && deviceNameFormat.test(deviceName)) {
        $('#downloadForm').submit();
        hidePopup();
        $(modalPopupContent).html($('#device-agent-downloading-content').html());
        showPopup();
        setTimeout(function () {
            hidePopup();
        }, 1000);
    }else {
        $("#invalid-username-error-msg span").text("Invalid device name");
        $("#invalid-username-error-msg").removeClass("hidden");
    }
}

function doAction(data) {
    //if it is saml redirection response
    if (data.status == null) {
        document.write(data);
    }

    if (data.status == "200") {
        $(modalPopupContent).html($('#download-device-modal-content-links').html());
        $("input#download-device-url").val(data.responseText);
        $("input#download-device-url").focus(function () {
            $(this).select();
        });
        showPopup();
    } else if (data.status == "401") {
        $(modalPopupContent).html($('#device-401-content').html());
        $("#device-401-link").click(function () {
            window.location = "/devicemgt/login";
        });
        showPopup();
    } else if (data == "403") {
        $(modalPopupContent).html($('#device-403-content').html());
        $("#device-403-link").click(function () {
            window.location = "/devicemgt/login";
        });
        showPopup();
    } else {
        $(modalPopupContent).html($('#device-unexpected-error-content').html());
        $("a#device-unexpected-error-link").click(function () {
            hidePopup();
        });
    }
}