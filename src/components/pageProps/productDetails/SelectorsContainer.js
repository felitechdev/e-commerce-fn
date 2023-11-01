import { useState } from "react"

const SelectorsContainer = (props) => {
    const [selectedItem, setSelectedItem] = useState(null);
    
    const handleItemClick = (e) => { 
        const { itemname, itemstype } = e.currentTarget.dataset;
        setSelectedItem({ itemname, itemstype })
        props.setCartItemInfo({
            ...props.cartItemInfo,
            [`$itemstype`]: e.target.innerHTML,
        })
    }

    return (
        <div className="flex flex-wrap gap-1">{props.values.map((size, index) => { 
            return <div
                key={index}
                className={`border-[2px] rounded-lg py-1 px-2 cursor-pointer ${
                    (props.size === 'large') ? 'text-sm': 'text-xs'
                } ${
                    selectedItem && 
                    selectedItem.itemname === size && 
                    selectedItem.itemstype === props.itemType
                        ? 'item-selected'
                        : ''
                }`}
                data-itemname={size}
                data-itemstype={props.itemType}
                onClick={handleItemClick}
            >
                {size}
            </div>
          })} 
          </div>
    )
}

export default SelectorsContainer
