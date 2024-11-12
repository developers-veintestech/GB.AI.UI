import React, { useState, useEffect } from 'react';
import './batch.scss';
import axios from "axios";
import { Card, CardBody } from 'reactstrap';
import { getFileData } from 'services/document';

const DocumentViewer = ({batchData}) => {
    // Initialize state to track active tabs for each section
    const [activeTabs, setActiveTabs] = useState({});
    const [selectedItem, setSelectedItem] = useState(batchData.documents[0]);
    const [fileUrl, setFileUrl] = useState({});

    // Function to handle tab clicks and update the state for each section
    const handleTabClick = (sectionId, tab, batchId) => {
        setActiveTabs(prevTabs => ({
            ...prevTabs,
            [sectionId]: tab
        }));

        if (tab === 'Documents') {
            onSplitDownloadHandler(batchId, selectedItem.id, sectionId)
        }
    };

    const handleItemClick = (item) => {
        setSelectedItem(item);
    };

    const onSplitDownloadHandler = async (batchId, documentId, splitDocumentId) => {
        const response = await getFileData(batchId, documentId, splitDocumentId); 
        const blob = new Blob([response.receiveObj], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        setFileUrl(prevUrl => ({
            ...prevUrl,
            [splitDocumentId]: `${url}#toolbar=0`
        }));
    };


    return (
        <div className="app">
            <div className="row">
                <div className="col">
                    <ul className="document-list">
                        {batchData.documents.map((item, rowIndex) => (
                            <li className={selectedItem === item ? 'active' : ''}
                                onClick={() => handleItemClick(item)}
                            >{item.name}</li>
                        ))}
                    </ul>
                </div>
                <div className="col main-content">
                    {selectedItem.details.map((item, index) => {
                        return <Card className="section mb-4">
                            <Section
                                key={item.id}
                                id={item.id}
                                title={item.category}
                                activeTab={activeTabs[item.id] || 'Fields'}
                                onTabClick={handleTabClick}
                                selectedItem={selectedItem}
                                fileURL={fileUrl}
                                batchId = {batchData.id}
                            />
                        </Card>
                    })}
                </div>
            </div>
        </div>
    );
}

const Section = ({ id, title, activeTab, onTabClick, selectedItem, fileURL, batchId}) => {
    return (
        <CardBody>
            <h2>{title}</h2>
            <div className="tabs">
                <button
                    className={activeTab === 'Fields' ? 'active' : ''}
                    onClick={() => onTabClick(id, 'Fields')}>
                    Fields
                </button>
                <button
                    className={activeTab === 'Documents' ? 'active' : ''}
                    onClick={() => onTabClick(id, 'Documents', batchId, selectedItem)}>
                    Documents
                </button>
            </div>
            <div>
                {activeTab === 'Fields' ? (
                    <div className="fields-content">
                        <div className="fields-content-col">
                            <p className='fields-content-row'><strong>Batch Document ID:</strong> {id}</p>
                            <p><strong>Status:</strong> {selectedItem.status}</p>
                        </div>
                    </div>
                ) : (
                    <iframe
                        title="PDF Viewer"
                        src={fileURL[id]}
                        style={{
                            display: 'flex',
                            justifyContent: 'space-around', width: '100%', height: '70vh'
                        }}
                    />
                )}
            </div>
        </CardBody>
    );
}

export default DocumentViewer;
