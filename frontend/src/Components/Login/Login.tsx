import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { AlertTitle, Divider } from '@mui/material'
import TextField from '@mui/material/TextField'
import Alert from '@mui/material/Alert'
import IconButton from '@mui/material/IconButton'
import Collapse from '@mui/material/Collapse'
import PhoneInput from 'react-phone-input-2'
import LoadingButton from '@mui/lab/LoadingButton'
import SendIcon from '@mui/icons-material/Send'
import { useMutation } from '@tanstack/react-query'
import { createNewAccessCode, validateAccessCode } from '../../apis/auth.api'

export default function Login() {
  const [accessCode, setAccessCode] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [messageSuccess, setMessageSuccess] = useState('')
  const [open, setOpen] = React.useState(true)

  const getAccessCode = useMutation({
    mutationFn: (phoneNumber: string) => {
      return createNewAccessCode(phoneNumber)
    },
    onSuccess: async (response) => {
      return await setMessageSuccess(response.data.message)
    }
  })

  const validateCode = useMutation({
    mutationFn: (_) => {
      return validateAccessCode(accessCode as string, phoneNumber as string)
    },
    onSuccess: async (response) => {
      return await response.data, setAccessCode(''), localStorage.setItem('phoneNumber', phoneNumber)
    }
  })

  const handleCreateCode = (phoneNumber: string) => {
    return getAccessCode.mutate(phoneNumber)
  }
  const handleValidateCode = (accessCode: any, phoneNumber: any) => {
    return validateCode.mutate(accessCode, phoneNumber)
  }
  return (
    <>
      <section className='bg-white'>
        <div className='lg:grid lg:min-h-screen lg:grid-cols-12'>
          <section className='relative flex h-32 items-center bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6'>
            <img
              alt='Night'
              src='https://images.unsplash.com/photo-1617195737496-bc30194e3a19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
              className='absolute inset-0 h-full w-full object-cover opacity-20'
            />
            <div className='hidden lg:relative lg:block lg:p-12'>
              <a className='block text-white' href='/'>
                <span className='sr-only'>Home</span>
              </a>
              <h2 className='mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl'>Welcome to Github Social </h2>
              <p className='sm:text-md mt-4 leading-relaxed text-white/90 md:text-lg'>
                Please verify your phone to access dashboard
              </p>
            </div>
          </section>
          <main
            aria-label='Main'
            className='flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:py-12 lg:px-16 xl:col-span-6'
          >
            <div className='max-w-xl lg:max-w-3xl'>
              {validateCode.isSuccess ? (
                <Alert severity='success'>
                  <AlertTitle>Verified</AlertTitle>
                  Your phone has successfully verified — <strong>Congratulation !!</strong>
                </Alert>
              ) : (
                <Card sx={{ maxWidth: 500, p: 4, boxShadow: 10 }}>
                  <CardContent>
                    <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
                      Validate OTP (One Time Passcode)
                    </Typography>
                    <Divider />
                    <Typography sx={{ mt: 2.5, fontSize: 14 }} color='text.secondary'>
                      A new security system has been enabled for you. Please register your phone to continue.
                    </Typography>
                  </CardContent>
                  <Box
                    component='form'
                    sx={{
                      '& .MuiTextField-root': { width: 400, maxWidth: '100%' }
                    }}
                    noValidate
                    autoComplete='off'
                  >
                    <Box sx={{ width: '100%', my: 2 }}>
                      <PhoneInput
                        inputStyle={{ width: '90%' }}
                        country={'us'}
                        aria-required={true}
                        value={phoneNumber}
                        onChange={(phoneNumber) => setPhoneNumber(phoneNumber)}
                      />
                    </Box>
                    {getAccessCode.isSuccess && (
                      <Box sx={{ width: '90%' }}>
                        <Collapse in={open} sx={{ my: 1 }}>
                          <Alert
                            icon={false}
                            severity='success'
                            action={
                              <IconButton
                                aria-label='close'
                                color='inherit'
                                onClick={() => {
                                  setOpen(false)
                                }}
                              ></IconButton>
                            }
                          >
                            {messageSuccess}
                          </Alert>
                        </Collapse>
                      </Box>
                    )}
                    {getAccessCode.isError && (
                      <Box sx={{ width: '90%' }}>
                        <Collapse in={open} sx={{ my: 1 }}>
                          <Alert
                            icon={false}
                            severity='error'
                            action={
                              <IconButton
                                aria-label='close'
                                color='inherit'
                                onClick={() => {
                                  setOpen(false)
                                }}
                              ></IconButton>
                            }
                          >
                            {'Invalid phone number, Please enter your phone correctly'}
                          </Alert>
                        </Collapse>
                      </Box>
                    )}
                    <div>
                      <TextField
                        required
                        id='outlined-required'
                        label='Verify Code: '
                        value={accessCode}
                        onChange={(e) => setAccessCode(e.target.value)}
                        size='small'
                        type='text'
                        helperText='Please enter your code to validate'
                      />
                    </div>
                    {validateCode.isError && (
                      <Box sx={{ width: '90%' }}>
                        <Collapse in={open} sx={{ my: 1 }}>
                          <Alert
                            icon={false}
                            severity='error'
                            action={
                              <IconButton
                                aria-label='close'
                                color='inherit'
                                onClick={() => {
                                  setOpen(false)
                                }}
                              ></IconButton>
                            }
                          >
                            {'Invalid OTP Code Entered'}
                          </Alert>
                        </Collapse>
                      </Box>
                    )}
                  </Box>
                  <CardActions>
                    {!getAccessCode.isSuccess ? (
                      <Button
                        type='submit'
                        size='small'
                        variant='contained'
                        onClick={() => handleCreateCode(phoneNumber)}
                      >
                        Get a one - time access Code
                      </Button>
                    ) : (
                      <LoadingButton
                        size='small'
                        onClick={() => handleValidateCode(accessCode, phoneNumber)}
                        endIcon={<SendIcon />}
                        loading={getAccessCode.isLoading}
                        loadingPosition='end'
                        variant='contained'
                      >
                        <span>Validate</span>
                      </LoadingButton>
                    )}
                  </CardActions>
                </Card>
              )}
            </div>
          </main>
        </div>
      </section>
    </>
  )
}
