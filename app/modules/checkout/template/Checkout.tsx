import AddressForm from "~/modules/checkout/components/AddressForm";
import ContactForm from "~/modules/checkout/components/ContactForm";
import DeliveryMethods from "~/modules/checkout/components/DeliveryMethods";
import OrderSummary from "~/modules/checkout/components/OrderSummary";
import PaymentMethods from "~/modules/checkout/components/PaymentMethods";

export const Checkout: React.FC = () => {
  return (
    <div className="container">
      <div className="flex items-start">
        <div>
          {/* <ContactForm /> */}
          <AddressForm />
          <DeliveryMethods />
          <PaymentMethods />
        </div>
        <div className="sticky top-0">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
};
