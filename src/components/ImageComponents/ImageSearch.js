import React, { Component } from "react";
import axios from "axios";
import ImageList from "../ImageComponents/ImageList";
import * as S from "./ImageStyles";

class ImageSearch extends Component {
	state = {
		search: "",
		status: null,
		searchresults: [],
		errorMesage: null,
	};

	/**
	 * Populate form entries to state
	 * @param {*} e - the event being fired
	 */
	handleInput = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	resetForm() {
		// reset form fields
		this.setState({
			search: "",
			offset: 1,
			status: null,
			errorMesage: null,
		});
	}

	getImages = async () => {
		try {
			const endpoint = "https://wme-image-search-api.herokuapp.com/api/search";

			const searchData = {
				search: this.state.search,
				offset: this.state.offset,
			};

			const data = await axios.post(endpoint, searchData);
			console.log("GETIMAGES: ", data.data);
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
	};

	render() {
		return (
			<>
				<S.SearchForm onSubmit={this.submitHandler}>
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
				</S.SearchForm>
				{this.state.searchresults.length > 0 ? (
					<ImageList searchresults={this.state.searchresults} />
				) : (
					""
				)}
			</>
		);
	}
}

export default ImageSearch;
