import { Box, Text, Image, Button } from '@skynexui/components';

function Header(props) {
  return (
    <>
      <Box styleSheet={{ 
        width: '100%', 
        marginBottom: '16px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between' 
      }} >
      <Text variant='heading5'>
        Chat
      </Text>

      <Box styleSheet={{
        display:'flex', 
        alignItems:'center', 
        gap:'8px'
      }}>

      <Image
          styleSheet={{
          borderRadius: '50%',
          marginBottom: '0',
          width: '50px',
          }}
          src={props.avatar}
      />

      <Text variant='heading5'>
          @{localStorage.getItem('login')}
      </Text>

      </Box>

      <Button
          onClick={() =>{
              localStorage.setItem('login', null);
          }}
          variant='tertiary'
          colorVariant='neutral'
          label='Logout'
          href="/"
      />
      </Box>
    </>
  )
}

export default Header;