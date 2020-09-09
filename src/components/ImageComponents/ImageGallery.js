import React from "react";
// import { Link } from "react-router-dom";
// import Loader from "react-loader-spinner";

import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import * as S from "./ImageStyles";

const ImageGallery = (props) => {
	const { searchresults } = props;
	console.log(`searchresults`, searchresults);
	return (
		<S.ImageGalleryContainer>
			<Carousel>
				{searchresults.map((result) => (
					<S.ImagePreview key={result.id}>
						<img src={result.url} />
					</S.ImagePreview>
				))}
			</Carousel>
		</S.ImageGalleryContainer>
	);
};

export default ImageGallery;
