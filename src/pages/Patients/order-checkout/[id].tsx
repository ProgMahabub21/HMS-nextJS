import { useRouter } from "next/router";
import Sidebar from "../Components/sidebar";
import { Session } from "inspector";

interface MedicineLists {
    id: number;
    medicineName: string;
    price: number;
    medicineGroup: string;
    status: string;
    quantity: number;
}

export default function OrderCheckoutPage({ cartItems }: { cartItems: MedicineLists[] }) {
    const router = useRouter();

    const handleCheckout = async () => {
        // Perform any necessary payment checkout logic
        // Redirect to Stripe's checkout page API
        // Replace 'YOUR_STRIPE_CHECKOUT_URL' with the actual URL provided by Stripe

        const userid = sessionStorage.getItem("userid");
        const total = calculateTotal();
        const stripe = require('stripe')('sk_test_51N6KAlDVaqngytN0P2fbU2rv9HpZx55S0zfa9a88pzGmixwg6MZs0ay4gp12x6Mga6u2NxDtmRI2AeaMADikB5vM00u9Cqk2OQ');

        const lineItems = cartItems.map(item => ({
            price_data: {
                currency: 'bdt', // Replace with the actual currency code
                product_data: {
                    name: item.medicineName,
                },
                unit_amount: item.price * 100, // Convert price to cents
            },
            quantity: item.quantity,
        }));

        const session = await stripe.checkout.sessions.create({
            success_url: `https://hms-next-js.vercel.app/Patients/payment-success?cartItems=${JSON.stringify(
                cartItems
            )}&userId=${userid}&amount=${total}&sessionId=\{CHECKOUT_SESSION_ID}`, // Update with your actual success URL and user ID
            line_items: lineItems,
            mode: 'payment',
            client_reference_id: userid,
        });

        console.log(session.id);
        window.location.href = session.url;

        // Calculate Subtotal


    };
    const calculateSubtotal = () => {
        const subtotal = cartItems.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );
        return `${subtotal}`;
    };

    const calculateTotal = () => {
        const subtotal = parseFloat(calculateSubtotal());

        const delivery = 100;

        const total = subtotal + delivery; // Add delivery fee

        return `${total.toFixed(2)}`;
    }

    return (
        <>
            <div className="grid grid-cols-12 ">


                <div className="col-span-9">

                    <div className="flex items-center justify-center h-screen">
                        <div className="flex justify-between w-3/4 p-6 bg-gray-800 rounded-lg">
                            <div className="w-2/3">
                                <h1 className="mb-4 text-2xl font-bold">Order Items</h1>
                                <ul>
                                    {cartItems.map((item, index) => (
                                        <li key={item.id}>
                                            <div className="flex items-center mb-2">
                                                <div>{index + 1}</div>
                                                <div className="ml-4">
                                                    <h3 className="text-lg font-semibold">{item.medicineName}</h3>
                                                </div>
                                                <div className="flex mx-5 ml-auto">
                                                    <p className="text-lg font-semibold">Qty: {item.quantity} pcs</p>
                                                </div>
                                                <div className="flex mx-5 ml-auto">
                                                    <p className="text-lg font-semibold">Price: {item.price} Tk</p>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>


                            <div className="w-1/3">
                                <h2 className="mb-4 text-xl font-bold">Price Details</h2>
                                <div className="p-4 bg-gray-800 rounded-lg">
                                    <div className="flex justify-between mb-2">
                                        <span>Subtotal:</span>
                                        <span>{calculateSubtotal()} TK</span> {/* Replace with actual subtotal */}
                                    </div>
                                    <div className="flex justify-between mb-2">
                                        <span>Delivery Fee:</span>
                                        <span>100 Tk</span> {/* Replace with actual tax */}
                                    </div>

                                    <hr className="my-2" />
                                    <div className="flex justify-between">
                                        <span className="font-bold">Total:</span>
                                        <span className="font-bold">{calculateTotal()} TK</span> {/* Replace with actual total */}
                                    </div>
                                </div>
                                <button
                                    className="w-full px-4 py-2 mt-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                                    onClick={handleCheckout}
                                >
                                    Proceed to Pay
                                </button>
                            </div>
                        </div>
                    </div></div>




            </div>

        </>
    )
}

export async function getServerSideProps(context: any) {
    // Retrieve the cartItems from the query parameters
    const { cartItems } = context.query;
    console.log(cartItems);

    // Parse the cartItems JSON string back to an array of objects 
    const parsedCartItems = JSON.parse(cartItems as string) as MedicineLists[];

    return {
        props: {
            cartItems: parsedCartItems,
        },
    };
}
