import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
const allowedAuthTokens = ['fake-auth-token-123'];

@Injectable()
export class AuthGuard implements CanActivate {

  constructor() {}

async CanActivate( context: ExecutionContext) : Promise<boolean>{
        const request = context.switchToHttp().getRequest();
        const authorizationHeader = request.headers['authorization'];

    if(!authorizationHeader){
      throw new HttpException(
        'Cabecalho de Autorizacao Requerida',
        HttpStatus.UNAUTHORIZED
      );
    }

    if (!allowedAuthTokens.includes(authorizationHeader)) {
        throw new HttpException(
            'Acesso Negado',
            HttpStatus.FORBIDDEN
            );
    }
    return true;
    }

}