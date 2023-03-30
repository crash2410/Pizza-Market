import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = () => (
    <ContentLoader
        className='pizza-block'
        speed={2}
        width={280}
        height={480}
        viewBox="0 0 280 480"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
    >
        <circle cx="141" cy="125" r="120"/>
        <rect x="0" y="265" rx="10" ry="10" width="280" height="24"/>
        <rect x="0" y="310" rx="10" ry="10" width="280" height="83"/>
        <rect x="2" y="420" rx="10" ry="10" width="105" height="27"/>
        <rect x="129" y="413" rx="23" ry="23" width="150" height="45"/>
    </ContentLoader>
)

export default Skeleton