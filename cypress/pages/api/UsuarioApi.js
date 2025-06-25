import { faker } from '@faker-js/faker/locale/pt_BR';

export default class UsuarioApi {
  static gerarUsuarioCadastro() {
    const nome = faker.person.fullName();
    const email = faker.internet.email({ firstName: nome.split(' ')[0] });
    const password = faker.internet.password({ length: 8, pattern: /[A-Za-z0-9!@#$%^&*]/ });
    return {
      nome,
      email,
      password,
      administrador: 'true'
    };
  }

  static gerarUsuarioAtualizacao() {
    const nome = faker.person.fullName();
    const email = faker.internet.email({ firstName: nome.split(' ')[0] });
    const password = faker.internet.password({ length: 8, pattern: /[A-Za-z0-9!@#$%^&*]/ });
    return {
      nome,
      email,
      password,
      administrador: 'true'
    };
  }

  static gerarUsuarioEmailInvalido() {
    const nome = faker.person.fullName();
    const email = 'emailinvalido';
    const password = faker.internet.password({ length: 8, pattern: /[A-Za-z0-9!@#$%^&*]/ });
    return {
      nome,
      email,
      password,
      administrador: 'true'
    };
  }

  static gerarUsuarioCamposVazios() {
    return {};
  }
} 