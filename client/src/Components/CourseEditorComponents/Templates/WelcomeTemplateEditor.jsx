import { useEffect } from "react";
import { Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { TextField } from "@mui/material";

export default function WelcomeTemplate() {
    const screen = useSelector((state) => state.screenEditor.screen);


    return (
        <Stack spacing={6}>
            <TextField
                defaultValue={screen[0] ? screen[0].text : ''}
                id="standard-basic"
                label="Course Title"
                variant="standard"
            />

            <TextField
                defaultValue={screen[1] ? screen[1].text : ''}
                id="standard-textarea"
                label="Course description"
                placeholder="Placeholder"
                multiline
                rows={3}
                variant="standard"
            />

            {/* <h1>{studentScreen.screen.elements[0].text}</h1>
        <h2>{studentScreen.screen.elements[1].text}</h2> */}
        </Stack>
    );

}