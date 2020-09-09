import React, { Component } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Loader from "react-loader-spinner";
import { EventEmitter } from "../../utils/events";
import * as S from "./ImageStyles";

export class ImageLibrary extends Component {
	state = {
		images: [],
		imageurl: "",
		thumbnailurl: "",
		description: "",
		show: false,
		imageid: null,
	};

	getUserImages = async () => {
		try {
			const endpoint = "/images/user";
			const response = await axios.get(endpoint);
			if (response.status === 200 && response.data) {
				console.log(`USER IMAGES `, response.data);
				this.setState({ images: response.data });
			}
		} catch (err) {
			console.error(err.response);
		}
	};

	deleteImage = async () => {
		try {
			const endpoint = `/images/image/${this.state.imageid}`;
			const response = await axios.delete(endpoint);
            if (response.status === 200) {
                this.getUserImages();
				this.handleClose();
			}
		} catch (err) {
			console.error(err.response);
		}
	};

	getCurrentImageAttributes = (e) => {
		e.preventDefault();
		const currentImage = e.currentTarget;
		console.log(`CURRENT IMAGE `, currentImage);
		this.setState(
			{
				imageid: currentImage.getAttribute("id"),
				imageurl: currentImage.getAttribute("imageurl"),
				thumbnailurl: currentImage.getAttribute("thumbnail"),
				description: currentImage.getAttribute("description"),
			},
			() => console.log(`THIS STATE: `, this.state)
		);
	};

	handleShow = (e) => {
		this.setState({ show: true });
		this.getCurrentImageAttributes(e);
	};

	handleClose = () => {
		this.setState({ show: false });
	};

	componentDidMount() {
		this.getUserImages();
		EventEmitter.dispatch("getUser");
	}

	render() {
		const { firstname } = this.props;
		const { images, show, imageurl } = this.state;
		return (
			<S.ImageLibraryContainer>
				<h2>{firstname}'s Image Library</h2>
				<Modal show={show} onHide={this.handleClose}>
					<Modal.Body>
						<img src={imageurl} alt="current" />
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={this.handleClose}>
							Close
						</Button>
						<Button variant="danger" onClick={this.deleteImage}>
							Delete Image
						</Button>
					</Modal.Footer>
				</Modal>
				{images.length > 0 ? (
					<S.ImageListContainer>
						{images.map((image) => (
							<S.ImageThumbNail key={image.imageid}>
								<img
									src={image.thumbnailurl}
									thumbnail={image.thumbnailurl}
									imageurl={image.imageurl}
									description={image.description}
									alt="search result"
									id={image.imageid}
									onClick={this.handleShow}
								/>
							</S.ImageThumbNail>
						))}
					</S.ImageListContainer>
				) : (
					<>
						<h2>Loading...</h2>
						<Loader type="Puff" color="#265077" height="60" width="60" />
					</>
				)}
			</S.ImageLibraryContainer>
		);
	}
}

export default ImageLibrary;
