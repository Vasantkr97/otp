import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";



const OtpLogin = () => {
  const [number, setNumber] = useState<string>("");
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [otp, setOtp] = useState<string[]>(["","","",""]);
  const [verified, setVerified] = useState<boolean>(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  //AutoFocus First Element
  useEffect (() => {
    if (otpSent) {
      inputRefs.current[0]?.focus();
    }
  },[otpSent]);

  //Number Submit handler
  const handlerNumberSubmit = () => {
    if (number.length === 10) {
      setOtpSent(true)
    } else {
      alert("Please enter a valid 10-digit Phone Number")
    }
  };

  //otp input change handler
  const handleOtpChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if(value && index < 3) {
      inputRefs.current[index+1]?.focus();
    }
  };

  //handle BackSpace key Navigation
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number): void => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index-1]?.focus();
    }
  };

  const handleVerify = () => {
    const enteredOtp = otp.join("");
    if (enteredOtp === "1234") {
      setVerified(true);
    } else {
      alert("InCorrect Otp. Try 1234 for test.");
    }
  };

  const handleReset = () => {
    setNumber("")
    setOtp(["","","",""])
    setOtpSent(false)
    setVerified(false)
  }

  const isOtpComplete: boolean = otp.every((digit) => digit !== "")

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-sm space-y-4 text-center">
        <h2 className="text-2xl font-bold text-gray-800">
          {verified ? "✅ Verified!" : "OTP Login" }
        </h2>
        {!otpSent ? (
          <>
            <input
              type="tel"
              maxLength={10}
              placeholder="Enter Phone Number"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={number}
              onChange={(e: ChangeEvent<HTMLInputElement>) => (
                setNumber(e.target.value)
              )}
            />

            <button 
              onClick={handlerNumberSubmit}
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
              Send OTP
            </button>
          </>
        ) : (
          !verified ? (
            <>
              <div className="flex justify-center gap-3">
                {otp.map((digit, index) => (
                  <input 
                    key={index}
                    type="text"
                    inputMode="numeric" 
                    pattern="[0-9]*"
                    maxLength={1}
                    value={digit}
                    ref={(el) => (inputRefs.current[index] = el)}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => (
                      handleOtpChange(e.target.value, index)
                    )}
                    onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => (
                      handleKeyDown(e, index)
                    )}
                    className="w-12 h-12 text-center text-xl border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ))}
              </div>
              <button
                onClick={handleVerify}
                disabled={!isOtpComplete}
                className={`w-full py-2 rounded-lg mt-3 transition ${
                  isOtpComplete ? "bg-green-500 hover:bg-green-600 text-white" :
                  "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Verify OTP
              </button>
              <button onClick={handleReset}
                  className="text-sm text-blue-500 underline mt-2"
                >
                Edit Phone number
              </button>
            </>
          ) : (
            <>
              <p className="text-green-600 font-semibold text-lg">
                Phone 4verified successfully!
              </p>
            </>
          )
        )}
      </div>
    </div>
  )




};

export default OtpLogin;