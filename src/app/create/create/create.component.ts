import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { SwiperComponent, SwiperConfig, SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { PetService } from 'src/app/services/pet.service';
import { viewClassName } from '@angular/compiler';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})

export class CreateComponent implements OnInit {

  petIds = [...Array(10)].map((_, i) => i + 1 );

  config: SwiperConfigInterface = {
    loop: true,
    navigation: true,
    pagination: {
      el: '.pager',
      clickable: true
    },
    centeredSlides: true,
    slidesPerView: 3
  };


  selectedPetId = 0;

  form = this.fb.group({
    name: ['', [
      Validators.required,
      Validators.maxLength(40)
    ]],
    gender: ['', [
      Validators.required,
      Validators.pattern(/male|female/)
    ]]
  });

  get nameControl() {
    return this.form.get('name') as FormControl;
  }

  constructor(
    private fb: FormBuilder,
    private petService: PetService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {}

    submit() {
      const formData = this.form.value;
      this.petService.createPet({
      name: formData.name,
      gender: formData.gender,
      level: 1,
      exp: 0,
      trainerId: this.authService.uid,
      petImageId: this.selectedPetId,
      ownerGitHubId: this.authService.gitHubId
     });
    }

}
