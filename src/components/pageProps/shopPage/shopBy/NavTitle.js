import React from "react";
import { BiCaretDown, BiCaretUp } from "react-icons/bi";

const NavTitle = ({ title, icons, classname , showBrands }) => {
  return (
    <div className="flex items-center justify-between pb-5">
      {icons ? (
        <>
          {/* text-lg underline lg:text-xl */}
          <h2 className={`font-semibold ${classname}  text-primeColor`}>
            {title}
          </h2>
          {icons && showBrands? 


<BiCaretUp className="text-black text-xl" zise={24} />: <BiCaretDown className="text-black text-xl" zise={24} />
          
        }
        </>
      ) : (
        <>
          <h2 className="font-semibold text-lg lg:text-xl text-primeColor">
            {title}
          </h2>
        </>
      )}
    </div>
  );
};

export default NavTitle;
