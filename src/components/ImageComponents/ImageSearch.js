import React, { Component } from "react";
import axios from "axios";
import Loader from "react-loader-spinner";
import ImageGallery from "../ImageComponents/ImageGallery";
import * as S from "./ImageStyles";

const IMAGE_SEARCH_API = "https://wme-image-search-api.herokuapp.com/api/search";

/**
 * Image search component which uses the custom search engine
 */
class ImageSearch extends Component {
	state = {
		search: "",
		status: null,
		searchresults: [],
		errorMesage: null,
		isLoading: false,
	};

	/**
	 * Populate form entries to state
	 * @param {*} e - the event being fired
	 */
	handleInput = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	toggleLoader() {
		this.setState((prev) => ({
			isLoading: !prev.isLoading,
		}));
	}

	resetForm() {
		// reset form fields
		this.setState({
			search: "",
			offset: 1,
			status: null,
			errorMesage: null,
			isLoading: false
		});
	}

	/**
	 * Retrieve list of image records from the custom search API
	 */
	getImages = async () => {
		try {
			const endpoint = IMAGE_SEARCH_API;

			const searchData = {
				search: this.state.search,
				offset: this.state.offset,
			};

			const data = await axios.post(endpoint, searchData);
			this.setState({ searchresults: data.data }, () => this.resetForm());
		} catch (err) {
			this.setState({
				status: err.status,
				errorMessage: err.response.data,
			});
		}
	};

	submitHandler = (e) => {
		e.preventDefault();
		this.getImages();
		this.toggleLoader();
	};

	render() {
		return (
			<>
				<S.SearchForm onSubmit={this.submitHandler}>
					<S.FormInputContainer>
						<input
							name="search"
							placeholder="Search for Images"
							onChange={this.handleInput}
							value={this.state.search}
						/>
						<S.SearchIcon
							className="fa fa-search"
							type="submit"
							value="&#xF002;"
						></S.SearchIcon>
					</S.FormInputContainer>
					<S.SearchButton type="submit" primary>Image Search</S.SearchButton>
				</S.SearchForm>

				{this.state.isLoading && (
					<Loader type="Puff" color="#265077" height="60" width="60" />
				)}
				{this.state.searchresults.length > 0 ? (
					<ImageGallery searchresults={this.state.searchresults} />
				) : (
					""
				)}
			</>
		);
	}
}

export default ImageSearch;
