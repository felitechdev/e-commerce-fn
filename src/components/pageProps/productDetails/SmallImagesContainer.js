const SmallImagesContainer = ({images}) => { 
    return (
        <div className="flex flex-row gap-1">
            {images.map((imageInfo) => { 
                return <img key={imageInfo._id} className="w-[45px] h-[45px] border-[2px] rounded-lg cursor-pointer" src={imageInfo.url} imageid={imageInfo._id} />
            })}
        </div>
    )
}

export default SmallImagesContainer;
