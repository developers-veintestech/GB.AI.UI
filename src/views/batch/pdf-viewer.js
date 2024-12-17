import { Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import React from "react";

const MemoizedViewer = React.memo(({ fileUrl }) => {
    const pluginInstance = defaultLayoutPlugin();
    return (
        <Viewer 
            fileUrl={fileUrl} 
            plugins={[pluginInstance]} 
        />
    );
});

export default MemoizedViewer;