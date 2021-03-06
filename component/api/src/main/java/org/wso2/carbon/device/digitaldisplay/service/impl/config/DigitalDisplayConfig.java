package org.wso2.carbon.device.digitaldisplay.service.impl.config;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.w3c.dom.Document;
import org.wso2.carbon.device.digitaldisplay.service.impl.config.exception.DigitalDisplayConfigurationException;
import org.wso2.carbon.utils.CarbonUtils;

import javax.xml.XMLConstants;
import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Unmarshaller;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.io.File;

public class DigitalDisplayConfig {

    private static final Log log = LogFactory.getLog(DigitalDisplayConfig.class);
    private static final String DEVICE_TYPE_CONFIG_PATH =
            CarbonUtils.getEtcCarbonConfigDirPath() + File.separator + "device-mgt-plugins" + File.separator
                    + "digitaldisplay.xml";
    private static DigitalDisplayConfig digitalDisplayConfig = new DigitalDisplayConfig();
    private static DeviceManagementConfiguration deviceManagementConfiguration;

    public static DigitalDisplayConfig getInstance() {
        return digitalDisplayConfig;
    }

    public static void initialize() throws DigitalDisplayConfigurationException {
        File configFile = new File(DEVICE_TYPE_CONFIG_PATH);
        try {
            Document doc = convertToDocument(configFile);

            /* Un-marshaling Webapp Authenticator configuration */
            JAXBContext ctx = JAXBContext.newInstance(DeviceManagementConfiguration.class);
            Unmarshaller unmarshaller = ctx.createUnmarshaller();
            //unmarshaller.setSchema(getSchema());
            deviceManagementConfiguration = (DeviceManagementConfiguration) unmarshaller.unmarshal(doc);
        } catch (JAXBException e) {
            throw new DigitalDisplayConfigurationException("Error occurred while un-marshalling the file " +
                                                                     DEVICE_TYPE_CONFIG_PATH, e);
        }

    }

    public DeviceManagementConfiguration getDeviceTypeConfiguration() {
        return  deviceManagementConfiguration;
    }

    public static Document convertToDocument(File file) throws DigitalDisplayConfigurationException {
        DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
        factory.setNamespaceAware(true);
        try {
            factory.setFeature(XMLConstants.FEATURE_SECURE_PROCESSING, true);
            DocumentBuilder docBuilder = factory.newDocumentBuilder();
            return docBuilder.parse(file);
        } catch (Exception e) {
            throw new DigitalDisplayConfigurationException("Error occurred while parsing file, while converting " +
                                                               "to a org.w3c.dom.Document", e);
        }
    }
}
