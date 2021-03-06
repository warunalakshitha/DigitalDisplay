/*
 * Copyright (c) 2015, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * you may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

package org.homeautomation.digitaldisplay.plugin.internal;
import org.wso2.carbon.event.input.adapter.core.InputEventAdapterService;

/**
 * DataHolder class of virtual firealarm plugins component.
 */
public class DigitalDisplayManagementDataHolder {

    private InputEventAdapterService inputEventAdapterService;

	private static DigitalDisplayManagementDataHolder thisInstance = new DigitalDisplayManagementDataHolder();

	private DigitalDisplayManagementDataHolder() {
	}

	public static DigitalDisplayManagementDataHolder getInstance() {
		return thisInstance;
	}

    public InputEventAdapterService getInputEventAdapterService() {
        return inputEventAdapterService;
    }

    public void setInputEventAdapterService(InputEventAdapterService inputEventAdapterService) {
        this.inputEventAdapterService = inputEventAdapterService;
    }

}
