import { useState } from 'react';
import { DocumentService } from '@/services/documentService';

interface VerifyDocumentProps {
  ipfsHash: string;
  onVerified: () => void;
}

export default function VerifyDocument({ ipfsHash, onVerified }: VerifyDocumentProps) {
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleVerify = async () => {
    try {
      setVerifying(true);
      setError(null);
      await DocumentService.verifyDocument(ipfsHash);
      onVerified();
    } catch (error) {
      setError('Failed to verify document. Please try again.');
      console.error('Verification error:', error);
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="space-y-4">
      {error && (
        <div className="bg-red-50 p-4 rounded-md">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <button
        onClick={handleVerify}
        disabled={verifying}
        className={`w-full py-2 px-4 rounded-md text-white transition-colors
          ${verifying
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-green-600 hover:bg-green-700'
          }`}
      >
        {verifying ? 'Verifying...' : 'Verify Document'}
      </button>
    </div>
  );
} 