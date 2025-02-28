import { useState, useEffect } from 'react';
import { DocumentService } from '@/services/documentService';
import VerifyDocument from './VerifyDocument';

interface DocumentDetailsProps {
  ipfsHash: string;
}

export default function DocumentDetails({ ipfsHash }: DocumentDetailsProps) {
  const [document, setDocument] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadDocument = async () => {
    try {
      setLoading(true);
      const doc = await DocumentService.getDocument(ipfsHash);
      setDocument(doc);
    } catch (error) {
      setError('Failed to load document details');
      console.error('Error loading document:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDocument();
  }, [ipfsHash]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  if (!document) {
    return <div>Document not found</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4">{document.name}</h2>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-500">IPFS Hash</p>
            <p className="font-mono">{document.ipfsHash}</p>
          </div>
          <div>
            <p className="text-gray-500">Owner</p>
            <p className="font-mono">{document.owner}</p>
          </div>
          <div>
            <p className="text-gray-500">Status</p>
            <p className={document.isVerified ? 'text-green-600' : 'text-yellow-600'}>
              {document.isVerified ? 'Verified' : 'Pending Verification'}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Uploaded</p>
            <p>{new Date(document.createdAt).toLocaleString()}</p>
          </div>
        </div>

        <div className="border-t pt-4">
          <a
            href={document.ipfsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800"
          >
            View on IPFS
          </a>
        </div>

        {!document.isVerified && (
          <div className="border-t pt-4">
            <VerifyDocument
              ipfsHash={document.ipfsHash}
              onVerified={loadDocument}
            />
          </div>
        )}
      </div>
    </div>
  );
} 