import { Grid, Button, TextField } from '@mui/material'


function LoginFormItem(params) {
    
    const onTypingHandler = (e) => {
        switch (e.target.id) {
            case 'outlined-id':
                setInputID(e.target.value)
                break
            case 'outlined-password':
                setInputPassword(e.target.value)
                break
            default:
                // nothing
        }
    }

    return (
        <Grid item xs={7}>
            <TextField onChange={onTypingHandler} autoFocus id="outlined-id" label="ID" fullWidth />
        </Grid>
    )
}

export default LoginFormItem