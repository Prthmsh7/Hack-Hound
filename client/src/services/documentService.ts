import api from '@/utils/api';

export interface UploadResponse {
  document: {
    id: string;
    ipfsHash: string;
    name: string;
    owner: string;
    isVerified: boolean;
    createdAt: string;
  };
  ipfsUrl: string;
}

export class DocumentService {
  static async uploadDocument(file: File): Promise<UploadResponse> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post('/documents/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  }

  static async verifyDocument(ipfsHash: string): Promise<void> {
    await api.post(`/documents/${ipfsHash}/verify`);
  }

  static async getDocuments() {
    const response = await api.get('/documents');
    return response.data;
  }

  static async getDocument(ipfsHash: string) {
    const response = await api.get(`/documents/${ipfsHash}`);
    return response.data;
  }
} 