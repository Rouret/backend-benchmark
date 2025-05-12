import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CatDto } from 'src/cat.dto';


@Controller()
export class AppController {

  @Post()
  postCat(@Body() createUserDto: CatDto): any {
    return createUserDto;
  }
}
