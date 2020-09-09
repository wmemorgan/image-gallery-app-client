import styled from "styled-components";
import {
	color,
	colorScheme,
	fontSizing,
	flex,
	breakpoints,
} from "../DesignComponents/theme";

export const SearchForm = styled.form`
	width: 90%;
    max-width: 600px;
    height: auto;
    ${flex("row", "center", "space-between")}
    margin: 5vh auto;
    margin-bottom: 1vh;
    padding: 1rem;
    border: 1px solid ${colorScheme.secondaryBorderColor}
    border-radius: 25px;

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

	img {
		width: 100%;
	}
`;
