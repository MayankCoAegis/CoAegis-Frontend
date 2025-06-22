import { Snackbar } from "@mui/material";

function SnackBar({showSnackBar,setShowSnackBar,message,setMessage})
{
     const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setShowSnackBar(false);
    setMessage("");
  };
    return(
        <>
        <Snackbar
        open={showSnackBar}
        autoHideDuration={4000}
        message={message}
        anchorOrigin={{ vertical:"bottom", horizontal:"center" }}
        onClose={handleClose}
      />
        </>
    )
}
export default SnackBar