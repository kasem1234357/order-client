import React from "react";

const PaymentMethodIcon = (props: any) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M14.8855 18.986H1.98047V8.21572C1.98047 6.47699 3.33621 5.0625 5.00313 5.0625H6.22993V5.66094H5.00313C3.66644 5.66094 2.57891 6.80722 2.57891 8.21572V18.3875H14.8855V18.986Z"
        fill="currentColor"
      />
      <path
        d="M18.5595 18.986V18.3875C20.0594 18.3875 21.2797 17.102 21.2797 15.5221V5.66094H11.1797V5.0625H21.8781V15.5221C21.8781 17.4322 20.3891 18.986 18.5595 18.986Z"
        fill="currentColor"
      />
      <path
        d="M21.5786 10.3594H2.44922V10.9578H21.5786V10.3594Z"
        fill="currentColor"
      />
      <path
        d="M21.5786 8.05664H2.44922V8.65508H21.5786V8.05664Z"
        fill="currentColor"
      />
      <path
        d="M12.3135 16.2077H3.87012V13.4473H12.3135V16.2077ZM4.46856 15.6093H11.7151V14.0457H4.46856V15.6093Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default PaymentMethodIcon;
