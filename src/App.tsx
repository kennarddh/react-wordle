/* eslint-disable security/detect-object-injection */
import { FC, useState, Fragment, useEffect } from 'react'

import { Container, Letter } from './AppStyles'

type IWords = string[][]

const App: FC = () => {
	const [Words, SetWords] = useState<IWords>(() =>
		Array(5).fill(Array(5).fill(''))
	)

	const [CurrentIndex, SetCurrentIndex] = useState<number>(0)
	const [CurrentWordIndex, SetCurrentWordIndex] = useState<number>(0)

	useEffect(() => {
		const OnKeyDown = (event: KeyboardEvent) => {
			const validKeyRegex = /[a-z]/i

			if (CurrentIndex === Words.length) return

			if (event.key === 'Enter' && CurrentWordIndex === 5) {
				SetCurrentIndex(prev => prev + 1)
				SetCurrentWordIndex(0)

				return
			}

			if (event.key === 'Backspace' && CurrentWordIndex !== 0) {
				SetWords(prev => [
					...prev.slice(0, CurrentIndex),
					[
						...Words[CurrentIndex].slice(0, CurrentWordIndex - 1),
						...Array(
							Words[CurrentIndex].length - CurrentWordIndex + 1
						).fill(''),
					],
					...prev.slice(CurrentIndex + 1, Words.length),
				])

				SetCurrentWordIndex(prev => prev - 1)

				return
			}

			if (!validKeyRegex.test(event.key) || event.key.length !== 1) return

			if (CurrentWordIndex === 5) return

			SetWords(prev => [
				...prev.slice(0, CurrentIndex),
				[
					...Words[CurrentIndex].slice(0, CurrentWordIndex),
					event.key.toUpperCase(),
					...Words[CurrentIndex].slice(
						CurrentWordIndex + 1,
						Words[CurrentIndex].length
					),
				],
				...prev.slice(CurrentIndex + 1, Words.length),
			])

			SetCurrentWordIndex(prev => prev + 1)
		}

		addEventListener('keydown', OnKeyDown)

		return () => removeEventListener('keydown', OnKeyDown)
	}, [CurrentIndex, CurrentWordIndex, Words])

	return (
		<Container>
			{Words.map((word, i) => (
				<Fragment key={i}>
					{word.map((letter, i2) => (
						<Letter
							key={i2}
							current={
								i === CurrentIndex && i2 === CurrentWordIndex
							}
						>
							{letter}
						</Letter>
					))}
				</Fragment>
			))}
		</Container>
	)
}

export default App
