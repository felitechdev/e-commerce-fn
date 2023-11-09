import { useState } from "react"

const SelectorsContainer = (props) => {
    const [selectedItem, setSelectedItem] = useState(null);
    
    const handleItemClick = (e) => { 
        const { itemname, itemstype } = e.currentTarget.dataset;
        setSelectedItem({ itemname, itemstype })
        props.setCartItemInfo({
            ...props.cartItemInfo,
            [`${itemstype}`]: e.target.innerHTML,
        })
    }

    return (
        <div className="flex flex-wrap gap-1">{props.displayedValues.map((value, index) => { 
            return <div
                key={index}
                className={`border-[2px] rounded-lg py-1 px-2 cursor-pointer ${
                    (props.size === 'large') ? 'text-sm': 'text-xs'
                } ${
                    selectedItem && 
                    selectedItem.itemname === value && 
                    selectedItem.itemstype === props.itemType
                        ? 'item-selected'
                        : ''
                }`}
                data-itemstype={props.itemType}
                onClick={handleItemClick}
            >
                {value}
            </div>
          })} 
          </div>
    )
}

export default SelectorsContainer
