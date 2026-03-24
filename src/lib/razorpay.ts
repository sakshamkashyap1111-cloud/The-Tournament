// Razorpay client-side integration
// NOTE: Order creation & payment verification MUST happen on your backend
// (Firebase Cloud Function). This file handles the client-side checkout flow.

declare global {
  interface Window {
    Razorpay: any;
  }
}

export interface RazorpayOrder {
  id: string;
  amount: number; // in paise
  currency: string;
}

export interface RazorpayPaymentResult {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

// TODO: Replace with your Razorpay Key ID (publishable key, safe for frontend)
const RAZORPAY_KEY_ID = "YOUR_RAZORPAY_KEY_ID";

// TODO: Replace with your Firebase Cloud Function URL for creating orders
const CREATE_ORDER_URL = "YOUR_CLOUD_FUNCTION_URL/createRazorpayOrder";

// TODO: Replace with your Firebase Cloud Function URL for verifying payments
const VERIFY_PAYMENT_URL = "YOUR_CLOUD_FUNCTION_URL/verifyRazorpayPayment";

/**
 * Step 1: Create an order on the backend
 * Your Firebase Cloud Function should:
 *   - Accept { amount, currency, receipt, notes }
 *   - Call Razorpay Orders API with your secret key
 *   - Return { id, amount, currency }
 */
export async function createRazorpayOrder(
  amountInRupees: number,
  receipt: string,
  notes?: Record<string, string>
): Promise<RazorpayOrder> {
  const response = await fetch(CREATE_ORDER_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      amount: amountInRupees * 100, // Convert to paise
      currency: "INR",
      receipt,
      notes,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create order");
  }

  return response.json();
}

/**
 * Step 2: Open Razorpay checkout popup
 */
export function openRazorpayCheckout(
  order: RazorpayOrder,
  userInfo: { name: string; email: string; phone: string },
  onSuccess: (result: RazorpayPaymentResult) => void,
  onFailure: (error: any) => void
): void {
  const options = {
    key: RAZORPAY_KEY_ID,
    amount: order.amount,
    currency: order.currency,
    name: "Arena Esports",
    description: "Tournament Registration",
    order_id: order.id,
    prefill: {
      name: userInfo.name,
      email: userInfo.email,
      contact: userInfo.phone,
    },
    theme: {
      color: "#E22227",
    },
    handler: (response: RazorpayPaymentResult) => {
      onSuccess(response);
    },
    modal: {
      ondismiss: () => {
        onFailure(new Error("Payment cancelled by user"));
      },
    },
  };

  const razorpay = new window.Razorpay(options);
  razorpay.on("payment.failed", (response: any) => {
    onFailure(response.error);
  });
  razorpay.open();
}

/**
 * Step 3: Verify payment on the backend
 * Your Firebase Cloud Function should:
 *   - Accept { razorpay_order_id, razorpay_payment_id, razorpay_signature }
 *   - Verify signature using Razorpay secret key
 *   - On success: save registration to Firestore, increment slot count
 *   - Return { verified: true/false }
 */
export async function verifyRazorpayPayment(
  paymentResult: RazorpayPaymentResult
): Promise<{ verified: boolean }> {
  const response = await fetch(VERIFY_PAYMENT_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(paymentResult),
  });

  if (!response.ok) {
    throw new Error("Payment verification failed");
  }

  return response.json();
}

/**
 * Complete payment flow — use this in your registration form
 */
export async function processPayment(
  amountInRupees: number,
  tournamentId: string,
  userInfo: { name: string; email: string; phone: string }
): Promise<RazorpayPaymentResult> {
  // 1. Create order on backend
  const order = await createRazorpayOrder(amountInRupees, `reg_${tournamentId}_${Date.now()}`, {
    tournamentId,
    playerName: userInfo.name,
  });

  // 2. Open checkout & wait for result
  return new Promise((resolve, reject) => {
    openRazorpayCheckout(order, userInfo, resolve, reject);
  });
}
