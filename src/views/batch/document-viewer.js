import React, { useState, useEffect } from 'react';
import './batch.scss';
import axios from "axios";
import { Card, CardBody } from 'reactstrap';

const DocumentViewer = (data) => {
    const batchData = data.batchData;

    // Initialize state to track active tabs for each section
    const [activeTabs, setActiveTabs] = useState({});
    const [selectedItem, setSelectedItem] = useState(batchData.documents[0]);
    const [fileUrl, setFileUrl] = useState({});

    // Function to handle tab clicks and update the state for each section
    const handleTabClick = (sectionId, tab) => {
        setActiveTabs(prevTabs => ({
            ...prevTabs,
            [sectionId]: tab
        }));

        if (tab === 'Documents' && activeTabs[sectionId] === undefined) {
            onSplitDownloadHandler(selectedItem.id, sectionId)
        }
    };

    const handleItemClick = (item) => {
        setSelectedItem(item);
    };

    const onSplitDownloadHandler = async (documentId, splitDocumentId) => {
        const response = await axios.get(`https://localhost:7125/api/batch/${9}/document/${documentId}/split/${splitDocumentId}/download`, {
            responseType: "blob",
        });

        const blob = new Blob([response.data], { type: 'application/pdf' });
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
                            />
                        </Card>
                    })}
                </div>
            </div>
        </div>
    );
}

const Section = ({ id, title, activeTab, onTabClick, selectedItem, fileURL }) => {
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
                    onClick={() => onTabClick(id, 'Documents', selectedItem)}>
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
