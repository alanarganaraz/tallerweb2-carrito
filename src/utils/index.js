export const validateCreditCard = async (cardData) => {
  const { cardNumber, cardCvv, cardValidThru, cardHolder } = cardData

  const validMockCard = {
    cardNumber: '4111111111111111',
    cardCvv: '123',
    cardValidThru: '12/26',
    cardHolder: 'JUAN PEREZ'
  }

  if (!cardNumber || !/^\d{16}$/.test(cardNumber)) {
    throw new Error('Número de tarjeta inválido')
  }

  if (!cardCvv || !/^\d{3}$/.test(cardCvv)) {
    throw new Error('CVV inválido')
  }

  if (!cardValidThru || !/^\d{2}\/\d{2}$/.test(cardValidThru)) {
    throw new Error('Fecha de vencimiento inválida')
  }

  const isValidLuhn = (num) => {
    let sum = 0
    for (let i = 0; i < num.length; i++) {
      let intVal = parseInt(num[num.length - 1 - i])
      if (i % 2 === 1) {
        intVal *= 2
        if (intVal > 9) intVal -= 9
      }
      sum += intVal
    }
    return sum % 10 === 0
  }

  if (!isValidLuhn(cardNumber)) {
    throw new Error('Número de tarjeta inválido (Luhn fallido)')
  }

  const [monthStr, yearStr] = cardValidThru.split('/')
  const month = parseInt(monthStr)
  const year = parseInt('20' + yearStr)

  if (month < 1 || month > 12) {
    throw new Error('Mes inválido')
  }

  const now = new Date()
  const cardDate = new Date(year, month)

  if (cardDate <= now) {
    throw new Error('Tarjeta vencida')
  }

  if (
    cardNumber !== validMockCard.cardNumber ||
    cardCvv !== validMockCard.cardCvv ||
    cardValidThru !== validMockCard.cardValidThru ||
    cardHolder?.toUpperCase() !== validMockCard.cardHolder
  ) {
    throw new Error('Tarjeta no autorizada')
  }

  return true
}
