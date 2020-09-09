import styled from "styled-components";
import {
	color,
	colorScheme,
	fontSizing,
	flex,
	breakpoints,
} from "../DesignComponents/theme";

export const SearchForm = styled.form`
	width: 100%;
    max-width: 600px;
    height: auto;
    ${flex("row", "center", "space-between")}
    margin: 10vh auto;
    padding: 1rem;
    border: 1px solid ${colorScheme.secondaryBorderColor}
    border-radius: 25px;

	input {
        width: 80%;
        // padding: 1rem;
        border: none;
        font-size: ${fontSizing.sm};
    }
    
    input::placeholder {
        font-size: ${fontSizing.sm};
        letter-spacing: 0.15rem;
    }
`;

export const SearchIcon = styled.button`
    width: 15%;
    font-size: ${fontSizing.sm};
    border: none;
    background: transparent;
`;

export const ImagePreview = styled.div`
	width: 300px;
	height: auto;

	img {
		width: 100%;
	}
`;
