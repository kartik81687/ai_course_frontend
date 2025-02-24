import React, { useEffect, useMemo, useState } from 'react';
import Header from '../components/header';
import Footers from '../components/footers';
import { Button, Label, Select } from 'flowbite-react';
import axios from 'axios';
import { amountInZarOne, amountInZarTwo, flutterwaveEnabled, flutterwavePlanIdOne, flutterwavePlanIdTwo, flutterwavePublicKey, logo, MonthCost, name, paypalEnabled, paypalPlanIdOne, paypalPlanIdTwo, paystackEnabled, paystackPlanIdOne, paystackPlanIdTwo, razorpayEnabled, razorpayPlanIdOne, razorpayPlanIdTwo, serverURL, stripeEnabled, stripePlanIdOne, stripePlanIdTwo, YearCost } from '../constants';
import { useLocation, useNavigate } from 'react-router-dom';
import countryList from 'react-select-country-list'
import { toast } from 'react-toastify';
import { AiOutlineLoading } from 'react-icons/ai';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import { FaCreditCard, FaPaypal, FaStripe, FaMoneyBill, FaShieldAlt } from 'react-icons/fa';
import { SiRazorpay } from 'react-icons/si';
import '../styles/colors.css';

const Payment = () => {

    const [email, setEmail] = useState(sessionStorage.getItem('email'));
    const [address, setAdress] = useState('');
    const [mName, setName] = useState(sessionStorage.getItem('mName'));
    const [lastName, setLastName] = useState('');
    const [post, setPost] = useState('');
    const [country, setCountry] = useState('');
    const [admin, setAdmin] = useState('');
    const options = useMemo(() => countryList().getData(), [])
    const { state } = useLocation();
    const { plan } = state || {};
    const [processing, setProcessing] = useState('');
    const navigate = useNavigate();

    useEffect(() => {

        if (!plan) {
            navigate("/pricing");
        }

    }, []);

    async function startPaystack() {
        if (!email || !mName || !lastName || !post || !address || !country || !admin) {
            showToast('Please fill in all required fields');
            return;
        }
        setProcessing('paystack')
        let planId = paystackPlanIdTwo;
        let amountInZar = amountInZarTwo;
        if (plan === 'Monthly Plan') {
            planId = paystackPlanIdOne;
            amountInZar = amountInZarOne;
        }
        const dataToSend = {
            planId: planId,
            amountInZar,
            email: email
        };
        try {
            const postURL = serverURL + '/api/paystackpayment';
            const res = await axios.post(postURL, dataToSend);
            sessionStorage.setItem('paystack', res.data.id);
            sessionStorage.setItem('method', 'paystack');
            sessionStorage.setItem('plan', plan);
            setProcessing('')
            window.location.href = res.data.url;

        } catch (error) {
            //DO NOTHING
        }
    }

    async function startStripe() {
        if (!email || !mName || !lastName || !post || !address || !country || !admin) {
            showToast('Please fill in all required fields');
            return;
        }
        setProcessing('stripe')
        let planId = stripePlanIdTwo;
        if (plan === 'Monthly Plan') {
            planId = stripePlanIdOne;
        }
        const dataToSend = {
            planId: planId
        };
        try {
            const postURL = serverURL + '/api/stripepayment';
            const res = await axios.post(postURL, dataToSend);
            sessionStorage.setItem('stripe', res.data.id);
            sessionStorage.setItem('method', 'stripe');
            sessionStorage.setItem('plan', plan);
            setProcessing('')
            window.location.href = res.data.url;

        } catch (error) {
            //DO NOTHING
        }
    }

    const config = {
        public_key: flutterwavePublicKey,
        tx_ref: Date.now(),
        currency: 'USD',
        amount: plan === 'Monthly Plan' ? MonthCost : YearCost,
        payment_options: "card",
        payment_plan: plan === 'Monthly Plan' ? flutterwavePlanIdOne : flutterwavePlanIdTwo,
        customer: {
            email: email,
            name: mName,
        },
        customizations: {
            title: name,
            description: 'Subscription Payment',
            logo: logo,
        },
    };

    const handleFlutterPayment = useFlutterwave(config);

    async function startRazorpay() {

        if (!email || !mName || !lastName || !post || !address || !country || !admin) {
            showToast('Please fill in all required fields');
            return;
        }
        setProcessing('razorpay')
        let fullAddress = address + ' ' + admin + ' ' + post + ' ' + country;
        let planId = razorpayPlanIdTwo;
        if (plan === 'Monthly Plan') {
            planId = razorpayPlanIdOne;
        }
        const dataToSend = {
            plan: planId,
            email: email,
            fullAddress: fullAddress
        };
        try {
            const postURL = serverURL + '/api/razorpaycreate';
            const res = await axios.post(postURL, dataToSend);
            sessionStorage.setItem('method', 'razorpay');
            setProcessing('')
            sessionStorage.setItem('plan', plan);
            window.open(res.data.short_url, '_blank');
            navigate('/pending', { state: { sub: res.data.id, link: res.data.short_url } });
        } catch (error) {
            //DO NOTHING
        }
    }

    async function startPayPal() {

        if (!email || !mName || !lastName || !post || !address || !country || !admin) {
            showToast('Please fill in all required fields');
            return;
        }
        setProcessing('paypal')
        let planId = paypalPlanIdTwo;
        if (plan === 'Monthly Plan') {
            planId = paypalPlanIdOne;
        }

        const dataToSend = {
            planId: planId,
            email: email,
            name: mName,
            lastName: lastName,
            post: post,
            address: address,
            country: country,
            brand: name,
            admin: admin
        };
        try {
            const postURL = serverURL + '/api/paypal';
            const res = await axios.post(postURL, dataToSend);
            sessionStorage.setItem('method', 'paypal');
            sessionStorage.setItem('plan', plan);
            setProcessing('')
            const links = res.data.links;
            const approveLink = links.find(link => link.rel === "approve");
            const approveHref = approveLink ? approveLink.href : null;
            window.location.href = approveHref;

        } catch (error) {
            startPayPal()
        }
    }


    const showToast = async (msg) => {
        setProcessing(false);
        toast(msg, {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
        });
    }

    return (
        <div className="min-h-screen bg-luxury flex flex-col">
            <Header isHome={false} />
            
            <div className="flex-1 relative mt-24">
                {/* Background Elements */}
                <div className="absolute inset-0">
                    <div className="absolute inset-0" style={{
                        backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
                        backgroundSize: '50px 50px'
                    }}></div>
                    {/* Animated Orbs */}
                    <div className="absolute w-full h-full">
                        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-amethyst rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-float"></div>
                        <div className="absolute top-2/3 right-1/4 w-96 h-96 bg-emerald rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-float" style={{animationDelay: '2s'}}></div>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-8 relative z-10">
                    <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
                        {/* Left Column - Payment Details */}
                        <div className="w-full md:w-1/2">
                            <div className="card-luxury p-8 rounded-2xl">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold text-[#FFD700]">Payment Details</h2>
                                    <FaShieldAlt className="text-2xl text-[#FFD700]" />
                                </div>
                                <p className="text-white/70 mb-8">Complete your subscription to {plan}</p>
                                
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-[#FFD700] font-medium block mb-2">Email</label>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="input-luxury w-full px-4 py-3 rounded-xl"
                                            placeholder="Enter your email"
                                            disabled
                                        />
                                    </div>
                                    
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-[#FFD700] font-medium block mb-2">First Name</label>
                                            <input
                                                type="text"
                                                value={mName}
                                                onChange={(e) => setName(e.target.value)}
                                                className="input-luxury w-full px-4 py-3 rounded-xl"
                                                placeholder="First name"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[#FFD700] font-medium block mb-2">Last Name</label>
                                            <input
                                                type="text"
                                                value={lastName}
                                                onChange={(e) => setLastName(e.target.value)}
                                                className="input-luxury w-full px-4 py-3 rounded-xl"
                                                placeholder="Last name"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-[#FFD700] font-medium block mb-2">Address</label>
                                        <input
                                            type="text"
                                            value={address}
                                            onChange={(e) => setAdress(e.target.value)}
                                            className="input-luxury w-full px-4 py-3 rounded-xl"
                                            placeholder="Enter your address"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-[#FFD700] font-medium block mb-2">Postal Code</label>
                                            <input
                                                type="text"
                                                value={post}
                                                onChange={(e) => setPost(e.target.value)}
                                                className="input-luxury w-full px-4 py-3 rounded-xl"
                                                placeholder="Postal code"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[#FFD700] font-medium block mb-2">Country</label>
                                            <select
                                                value={country}
                                                onChange={(e) => {
                                                    const selectedValue = e.target.value;
                                                    const selectedOption = options.find(
                                                        (country) => country.value === selectedValue
                                                    );
                                                    setCountry(selectedOption.value);
                                                    setAdmin(selectedOption.label)
                                                }}
                                                className="input-luxury w-full px-4 py-3 rounded-xl"
                                            >
                                                <option value="">Select Country</option>
                                                {options.map((country) => (
                                                    <option key={country.value} value={country.value}>
                                                        {country.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Payment Methods */}
                        <div className="w-full md:w-1/2">
                            <div className="card-luxury p-8 rounded-2xl">
                                <h2 className="text-2xl font-bold text-[#FFD700] mb-6">Select Payment Method</h2>
                                
                                <div className="space-y-4">
                                    <button
                                        onClick={startStripe}
                                        disabled={processing}
                                        className="btn-luxury w-full py-4 px-6 rounded-xl flex items-center justify-between hover:scale-105 transition-all duration-300"
                                    >
                                        <div className="flex items-center">
                                            <FaStripe className="text-2xl mr-3" />
                                            <span>Pay with Stripe</span>
                                        </div>
                                        {processing && <AiOutlineLoading className="animate-spin text-xl" />}
                                    </button>

                                    <button
                                        onClick={startPayPal}
                                        disabled={processing}
                                        className="btn-neon w-full py-4 px-6 rounded-xl flex items-center justify-between hover:scale-105 transition-all duration-300"
                                    >
                                        <div className="flex items-center">
                                            <FaPaypal className="text-2xl mr-3" />
                                            <span>Pay with PayPal</span>
                                        </div>
                                        {processing && <AiOutlineLoading className="animate-spin text-xl" />}
                                    </button>

                                    <button
                                        onClick={startRazorpay}
                                        disabled={processing}
                                        className="btn-luxury w-full py-4 px-6 rounded-xl flex items-center justify-between hover:scale-105 transition-all duration-300"
                                    >
                                        <div className="flex items-center">
                                            <SiRazorpay className="text-2xl mr-3" />
                                            <span>Pay with Razorpay</span>
                                        </div>
                                        {processing && <AiOutlineLoading className="animate-spin text-xl" />}
                                    </button>

                                    <button
                                        onClick={startPaystack}
                                        disabled={processing}
                                        className="btn-neon w-full py-4 px-6 rounded-xl flex items-center justify-between hover:scale-105 transition-all duration-300"
                                    >
                                        <div className="flex items-center">
                                            <FaMoneyBill className="text-2xl mr-3" />
                                            <span>Pay with Paystack</span>
                                        </div>
                                        {processing && <AiOutlineLoading className="animate-spin text-xl" />}
                                    </button>

                                    <button
                                        onClick={handleFlutterPayment}
                                        disabled={processing}
                                        className="btn-luxury w-full py-4 px-6 rounded-xl flex items-center justify-between hover:scale-105 transition-all duration-300"
                                    >
                                        <div className="flex items-center">
                                            <FaCreditCard className="text-2xl mr-3" />
                                            <span>Pay with Flutterwave</span>
                                        </div>
                                        {processing && <AiOutlineLoading className="animate-spin text-xl" />}
                                    </button>
                                </div>

                                <div className="mt-8 text-center">
                                    <p className="text-white/60 text-sm">
                                        Secure payment powered by industry-leading providers
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footers />
        </div>
    );
};

export default Payment;
