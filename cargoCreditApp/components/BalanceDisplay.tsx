// A pretty Display showing the token balannce


export default function BalanceDisplay({ balance }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        marginTop: '1rem',
      }}
    >
      <div

        style={{
          fontSize: '1.5rem',
          fontWeight: 500,
          marginBottom: '0.5rem',
        }}
      >
        Your Balance
      </div>
      <div
        style={{
          fontSize: '1.5rem',
          fontWeight: 500,
          marginBottom: '0.5rem',
        }}
      >
        {balance}
      </div>
    </div>
  )
}

