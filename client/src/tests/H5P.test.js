import { textTransform } from '@mui/system'
import {render} from '@testing-library/react'
import {Pixabay} from '../Components/Pixabay/PixabayOpen'

test('Pixabay finds pictures with valid search-terms', () => {
    render("<Pixabay />")
})