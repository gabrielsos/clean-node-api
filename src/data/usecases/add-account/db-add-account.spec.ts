import { DbAddAccount } from './db-add-account'

describe('DbAddAccount', () => {
  test('should call encrypter with correct password', async () => {
    class EncrypterStub {
      async encrypt (value: string): Promise<string> {
        return new Promise(resolve => resolve('hashedPassword'))
      }
    }
    const encrypterStub = new EncrypterStub()
    const sut = new DbAddAccount(encrypterStub)
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
