/**
 * Monobank Acquiring API Integration
 * Documentation: https://api.monobank.ua/docs/checkout.html
 */

const MONOBANK_API_URL = 'https://api.monobank.ua/api/merchant';

export interface MonobankInvoiceRequest {
  amount: number; // Amount in kopecks (UAH * 100)
  ccy?: number; // Currency code (980 = UAH, 840 = USD, 978 = EUR)
  merchantPaymInfo: {
    reference: string; // Your order ID
    destination: string; // Payment description
    basketOrder?: Array<{
      name: string;
      qty: number;
      sum: number;
      icon?: string;
      unit?: string;
      code?: string;
    }>;
  };
  redirectUrl: string; // URL to redirect after payment
  webHookUrl?: string; // URL for payment status callback
  validity?: number; // Invoice validity in seconds (default 24h)
  paymentType?: 'debit' | 'hold'; // Payment type
}

export interface MonobankInvoiceResponse {
  invoiceId: string;
  pageUrl: string;
}

export interface MonobankInvoiceStatus {
  invoiceId: string;
  status: 'created' | 'processing' | 'hold' | 'success' | 'failure' | 'reversed' | 'expired';
  failureReason?: string;
  amount: number;
  ccy: number;
  finalAmount?: number;
  createdDate: string;
  modifiedDate: string;
  reference?: string;
  destination?: string;
  cancelList?: Array<{
    status: string;
    amount: number;
    ccy: number;
    createdDate: string;
    modifiedDate: string;
    approvalCode?: string;
    rrn?: string;
  }>;
}

export interface MonobankWebhookPayload {
  invoiceId: string;
  status: 'created' | 'processing' | 'hold' | 'success' | 'failure' | 'reversed' | 'expired';
  failureReason?: string;
  errCode?: string;
  amount: number;
  ccy: number;
  finalAmount?: number;
  createdDate: string;
  modifiedDate: string;
  reference?: string;
  destination?: string;
}

class MonobankClient {
  private token: string;

  constructor() {
    const token = process.env.MONOBANK_TOKEN;
    if (!token) {
      console.warn('⚠️ MONOBANK_TOKEN not configured. Payments will fail.');
    }
    this.token = token || '';
  }

  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${MONOBANK_API_URL}${endpoint}`, {
      ...options,
      headers: {
        'X-Token': this.token,
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Monobank API error: ${response.status} - ${errorText}`);
      throw new Error(`Monobank API error: ${response.status} - ${errorText}`);
    }

    return response.json();
  }

  /**
   * Create a new invoice for payment
   */
  async createInvoice(data: MonobankInvoiceRequest): Promise<MonobankInvoiceResponse> {
    return this.request<MonobankInvoiceResponse>('/invoice/create', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  /**
   * Get invoice status
   */
  async getInvoiceStatus(invoiceId: string): Promise<MonobankInvoiceStatus> {
    return this.request<MonobankInvoiceStatus>(`/invoice/status?invoiceId=${invoiceId}`, {
      method: 'GET',
    });
  }

  /**
   * Cancel invoice (void hold or refund)
   */
  async cancelInvoice(invoiceId: string, extRef?: string, amount?: number): Promise<{ status: string }> {
    const body: Record<string, unknown> = { invoiceId };
    if (extRef) body.extRef = extRef;
    if (amount) body.amount = amount;
    
    return this.request<{ status: string }>('/invoice/cancel', {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  /**
   * Check if Monobank is properly configured
   */
  isConfigured(): boolean {
    return !!this.token;
  }
}

// Export singleton instance
export const monobank = new MonobankClient();

// Price plans in UAH (kopecks for API)
export const PRICE_PLANS = {
  trial_1w: {
    name: '1 Тиждень',
    priceUAH: 42, // ~$1
    priceKopecks: 4200,
  },
  trial_2w: {
    name: '2 Тижні',
    priceUAH: 229, // ~$5.49
    priceKopecks: 22900,
  },
  trial_4w: {
    name: '4 Тижні',
    priceUAH: 419, // ~$9.99
    priceKopecks: 41900,
  },
};

export type PlanId = keyof typeof PRICE_PLANS;
