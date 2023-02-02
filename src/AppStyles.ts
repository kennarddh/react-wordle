import styled from 'styled-components'

export const Container = styled.div`
	display: grid;
	grid-template-rows: repeat(5, 50px);
	grid-template-columns: repeat(5, 50px);
`

export const Letter = styled.p<{
	current: boolean
	correct: boolean
	wrongPlace: boolean
}>`
	border: 1px solid #000;

	background-color: ${({ current, correct, wrongPlace }) =>
		current
			? '#ffc2c2'
			: correct
			? '#00ff00'
			: wrongPlace
			? '#ffff00'
			: '#fff'};
`
