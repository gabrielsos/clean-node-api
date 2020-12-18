import { Encrypter } from '../../protocols/encrypter'
import { DbAddAccount } from './db-add-account'

interface sutType {
  sut: DbAddAccount
  encrypterStub: Encrypter
}

const makeSut = (): sutType => {
  class EncrypterStub {
    async encrypt (value: string): Promise<string> {
      return new Promise(resolve => resolve('hashedPassword'))
    }
  }
  const encrypterStub = new EncrypterStub()
  const sut = new DbAddAccount(encrypterStub)

  return {
    sut,
    encrypterStub
  }
}
describe('DbAddAccount', () => {
  test('should call encrypter with correct password', async () => {
    const { encrypterStub, sut } = makeSut()
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
    const accountData = {
      name: 'validName',
      email: 'validEmail',
      password: 'validPassword'
    }
    await sut.add(accountData)
    expect(encryptSpy).toHaveBeenCalledWith('validPassword')
  })
})
