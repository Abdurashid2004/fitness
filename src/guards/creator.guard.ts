// import {
//   BadRequestException,
//   CanActivate,
//   ExecutionContext,
//   Injectable,
//   UnauthorizedException,
// } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { Observable } from 'rxjs';

// @Injectable()
// export class CreatorGuard implements CanActivate {
//   constructor(private readonly jwtService: JwtService) {}
//   canActivate(
//     context: ExecutionContext,
//   ): boolean | Promise<boolean> | Observable<boolean> {
//     const req = context.switchToHttp().getRequest();
//     const authHeader = req.headers.authorization;
//     console.log(authHeader);
//     if (!authHeader) {
//       throw new UnauthorizedException('Unauthorized admin 1');
//     }

//     const bearer = authHeader.split(' ')[0];
//     const token = authHeader.split(' ')[1];

//     if (bearer !== 'Bearer' || !token) {
//       throw new UnauthorizedException('Unauthorized admin');
//     }

//     async function verify(token: string, jwtService: JwtService) {
//       let admin: any;
//       try {
//         admin = await jwtService.verify(token, {
//           secret: process.env.ACCESS_TOKEN_KEY,
//         });
//       } catch (error) {
//         throw new BadRequestException(error.message);
//       }

//       if (!admin) {
//         throw new UnauthorizedException('Unauthorized admin');
//       }

//       if(!admin.is_creator) {
//         throw new BadRequestException('admin is not admin');
//       }

//       req.admin = admin;
//       return true;
//     }

//     return verify(token, this.jwtService);
//   }
// }
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class CreatorGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization
    if (!authHeader) {
      throw new UnauthorizedException(
        'Unauthorized: No authorization header provided',
      );
    }

    const [bearer, token] = authHeader.split(' ');

    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException(
        'Unauthorized: Invalid authorization header',
      );
    }

    try {
      const admin = await this.jwtService.verifyAsync(token, {
        secret: process.env.ACCESS_TOKEN_KEY,
      });

      if (!admin || !admin.is_creator) {
        throw new BadRequestException('Unauthorized: User is not a creator');
      }

      req.admin = admin;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Unauthorized: Invalid token');
    }
  }
}

