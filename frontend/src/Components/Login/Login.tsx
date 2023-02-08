import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { LOCALHOST } from '../../utils/System'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Divider } from '@mui/material'
import TextField from '@mui/material/TextField'
import Alert from '@mui/material/Alert'
import IconButton from '@mui/material/IconButton'
import Collapse from '@mui/material/Collapse'
import CloseIcon from '@mui/icons-material/Close'
import PhoneInput from 'react-phone-input-2'
interface GithubType {
  id: number
  login: any
}
interface GithubUser {
  id: number
  login: any
  avatar_url: any
  followers: any
  public_repos: any
}

export default function Login() {
  const [accessCode, setAccessCode] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [open, setOpen] = React.useState(true)

  const createNewAccessCode = async () => {
    const response = await axios.post('/createNewAccessCode', { phoneNumber })
    setAccessCode(response.data)
  }

  const validateAccessCode = async () => {
    await axios.post('/validateAccessCode', { accessCode, phoneNumber })
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
                  <Box sx={{ width: '100%' }}>
                    <PhoneInput
                      inputStyle={{ width: '90%' }}
                      country={'us'}
                      aria-required={true}
                      value={phoneNumber}
                      onChange={(phoneNumber) => setPhoneNumber(phoneNumber)}
                    />
                  </Box>
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
                          >
                            <CloseIcon fontSize='inherit' />
                          </IconButton>
                        }
                      >
                        A OTP (6 digit code) has been sent to +078574234. Please enter the OTP in the field below to
                        verify your phone
                      </Alert>
                    </Collapse>
                  </Box>
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
                </Box>
                <CardActions>
                  <Button type='submit' size='small' variant='contained' onClick={createNewAccessCode}>
                    Get a one - time access Code
                  </Button>
                  <Button type='submit' size='small' variant='contained' onClick={validateAccessCode}>
                    Validate
                  </Button>
                </CardActions>
              </Card>
            </div>
          </main>
        </div>
      </section>
    </>
  )
}
