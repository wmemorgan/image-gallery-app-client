import styled from "styled-components";
import {
	color,
	colorScheme,
	fontSizing,
	flex,
	breakpoints,
} from "../DesignComponents/theme";
import Button from "../DesignComponents/Button";

export const FormInputContainer = styled.div`
	width: 100%;
    ${flex("row", "center", "space-between")};
    margin-bottom: 2vh;
    padding: 1rem;
    border: 1px solid ${colorScheme.secondaryBorderColor}
    border-radius: 25px;
`;

export const SearchForm = styled.form`
	width: 90%;
	max-width: 600px;
	height: auto;
	${flex("column", "center", "center")};
	// ${flex("row", "center", "space-between")}
	margin: 5vh auto;
	margin-bottom: 1vh;
	padding: 1rem;
	border: none;
	// border: 1px solid ${colorScheme.secondaryBorderColor}
	// border-radius: 25px;

	input {
		width: 80%;
		border: none;
		font-size: ${fontSizing.sm};
	}

	input::placeholder {
		font-size: ${fontSizing.sm};
		letter-spacing: 0.1rem;
	}
`;

export const SearchIcon = styled.button`
	width: 15%;
	font-size: ${fontSizing.sm};
	border: none;
	background: transparent;
`;

export const ImageGalleryContainer = styled.div`
    width: 100%;
    max-width: 800px;
    margin: 1vh auto;
    padding: 2rem;
    border: 1px solid ${colorScheme.secondaryBorderColor}
    border-radius: 5px;
    box-shadow: 0 8px 6px -6px rgba(0,0,0,0.75);
`;

export const ImagePreview = styled.div`
	height: 300px;
	cursor: pointer;

	img {
		width: 100%;
	}
`;

export const ImageLibraryContainer = styled.div`
	width: 100%;
	max-width: 800px;
	margin: 5vh auto;
	${flex("column", "center", "center")}
`;

export const ImageListContainer = styled.div`
	width: 100%;
	${flex("row", "center", "space-evenly")}

	@media ${breakpoints[0]} {
		${flex("column", "center", "center")}
	}
`;

export const ImageThumbNail = styled.div`
	width: 150px;
	height: auto;

	border: 1px solid ${color.defaultBorderColor};
    border-radius: 5px;
    cursor: pointer;

	img {
		width: 100;
	}
`;

export const SearchButton = styled(Button)`
	width: 150px;
	color: ${color.lightText};
	letter-spacing: 0.1rem;
	outline: none;
`;
