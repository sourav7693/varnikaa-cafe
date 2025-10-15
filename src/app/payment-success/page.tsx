import Link from "next/link";
import { redirect } from "next/navigation";

export default async function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ payment_id?: string; order_id?: string }>;
}) {
  const { payment_id, order_id } = await searchParams;

  if (!payment_id || !order_id) {
    redirect("/");
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center">
      <h1 className="text-3xl font-bold text-green-600 mb-4">
        Payment Successful 🎉
      </h1>

      <p className="text-gray-700 mb-2">Thank you for your payment.</p>

      <div className="mt-4 bg-gray-100 p-4 rounded-lg shadow">
        <p>
          <strong>Payment ID:</strong> {payment_id}
        </p>
        <p>
          <strong>Order ID:</strong> {order_id}
        </p>
      </div>

      <Link
        href="/"
        className="mt-6 inline-block bg-green-600 text-white px-6 py-2 rounded-lg"
      >
        Go to Home
      </Link>
    </div>
  );
}
