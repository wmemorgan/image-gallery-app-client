import React, { useState } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Carousel } from "react-responsive-carousel";
import { EventEmitter } from "../../utils/events";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import * as S from "./ImageStyles";

/**
 * Component which displays the search results.
 * Also allows a user to select and save an image from the search results.
 *
 * @param {*} props - search results
 */
const ImageGallery = (props) => {
	const [show, setShow] = useState(false);
	const [currentpic, setCurrentPic] = useState("");
	const [currentthumbnail, setCurrentThumbnail] = useState("");
	const [description, setCurrentDescription] = useState("");

	/**
	 * Save image to user library
	 *
	 * @param {*} e
	 */
	const handleSaveImage = async (e) => {
		e.preventDefault();
		try {
			const newImage = {
				imageurl: currentpic,
				description: description,
				thumbnailurl: currentthumbnail,
			};

			const endpoint = "/images/image";
			const data = await axios.post(endpoint, newImage);
			console.log(`ADD IMAGE `, data);
			if (data.status === 201) {
				EventEmitter.dispatch("getUser");
				handleClose();
			}
		} catch (err) {
			console.error(err.response);
		}
	};

	/**
	 * Hide modal
	 */
	const handleClose = () => setShow(false);

	/**
	 * Display model and obtain attributes of the selected image
	 *
	 * @param {*} e
	 */
	const handleShow = (e) => {
		setShow(true);
		getCurrentImageAttributes(e);
	};

	/**
	 * Get the element attributes of the selected image
	 *
	 * @param {*} e
	 */
	const getCurrentImageAttributes = (e) => {
		e.preventDefault();
		const currentImage = e.currentTarget.getElementsByTagName("img")[0];
		setCurrentPic(currentImage.getAttribute("src"));
		setCurrentThumbnail(currentImage.getAttribute("thumbnail"));
		setCurrentDescription(currentImage.getAttribute("description"));
	};

	const { searchresults } = props;
	return (
		<S.ImageGalleryContainer>
			<Modal show={show} onHide={handleClose}>
				<Modal.Body>
					<img src={currentpic} alt="current" />
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" onClick={handleSaveImage}>
						Save Image
					</Button>
				</Modal.Footer>
			</Modal>
			<Carousel>
				{searchresults.map((result) => (
					<S.ImagePreview
						key={result.id}
						imageurl={result.url}
						thumbnail={result.thumbnail}
						onClick={handleShow}
					>
						<img
							src={result.url}
							alt="search result"
							thumbnail={result.thumbnail}
							description={result.snippet}
						/>
					</S.ImagePreview>
				))}
			</Carousel>
		</S.ImageGalleryContainer>
	);
};

export default ImageGallery;
