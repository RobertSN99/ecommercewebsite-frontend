import React from "react";

const Success = () => {
  return (
    <div className="flex flex-col items-center justify-center m-10 gap-8 h-screen text-lg text-center">
      <h1 className="lg:text-5xl sm:text-2xl border-b-[16px] border-green-400 rounded-full lg:px-16 sm:px-2 lg:py-3 md:px-4 sm:py-3">Payment Successful! 🎉</h1>
      <p className="mt-16">
        Your purchase was completed successfully. Thank you for choosing our
        services.
      </p>
      <p>
        If you have any questions or concerns, please feel free to contact us.
      </p>
    </div>
  );
};

export default Success;
