export const Footer = () => {
  return (
    <div className=" mt-10 w-full bg-neutral-50 pb-10 pt-5">
      <div className="container flex gap-10">
        <div>
          <div className=" mb-2 font-extrabold text-primary-600 sf-headline-2">
            CATARINA
          </div>
          <div className="text-sm font-normal text-gray-800">
            Nước hoa phong cách dành cho bạn
          </div>
        </div>
        <div className="ml-auto flex flex-col items-center justify-center">
          <ul className="flex flex-wrap gap-10 text-sm">
            <li>Liên hệ</li>
            <li>Chính sách</li>
            <li>Vận chuyển</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
