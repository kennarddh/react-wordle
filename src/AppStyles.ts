import styled from 'styled-components'

export const Container = styled.div`
	display: grid;
	grid-template-rows: repeat(5, 50px);
	grid-template-columns: repeat(5, 50px);
`

export const Letter = styled.p<{ current: boolean }>`
	border: 1px solid #000;

	background-color: ${({ current }) => (current ? '#ffc2c2' : '#fff')};
`
