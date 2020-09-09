import React from "react";
// import { Link } from "react-router-dom";
// import Loader from "react-loader-spinner";

import * as S from "./ImageStyles";

const ImageGallery = (props) => {
	const { searchresults } = props;
	console.log(`searchresults`, searchresults);
	return (
		<>
			{searchresults.map((result) => (
				<S.ImagePreview key={result.id}>
					<img src={result.url} />
				</S.ImagePreview>
			))}
		</>
	);
};

export default ImageGallery;
