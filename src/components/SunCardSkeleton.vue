<template>
  <ion-card>
    <ion-card-header>
      <ion-card-header>
        <ion-card-title>Sol 🔆</ion-card-title>
        <ion-card-subtitle>Shining as always</ion-card-subtitle>
      </ion-card-header>
      <ion-card-content>
        <div class="flex justify-start max-w-[175px]">
          <div class="flex justify-between w-[40px]">
            <div>Rise</div>
            <div>:</div>
          </div>
          <span class="w-[10px]"></span>
          &nbsp;
          <ion-skeleton-text animated class="w-[70%]" />
        </div>
        <div class="flex justify-start max-w-[175px]">
          <div class="flex justify-between w-[40px]">
            <div>Set</div>
            <div>:</div>
          </div>
          <span class="w-[10px]"></span>
          &nbsp;
          <ion-skeleton-text animated class="w-[70%]" />
        </div>
        <br>
        <div class="flex justify-between max-w-[275px]">
          <div class="flex justify-start w-[135px] mb-[5%]">
            <div class="flex justify-between w-[30px]">
              <div>RA</div>
              <div>:</div>
            </div>
            <span class="w-[10px]"></span>
            <ion-skeleton-text animated class="w-[70%] mr-2" />
          </div>
          <div class="flex justify-start w-[135px]">
            <div class="flex justify-between w-[35px]">
              <div>Dec</div>
              <div>:</div>
            </div>
            <span class="w-[10px]"></span>
            <ion-skeleton-text animated class="w-[70%]" />
          </div>
        </div>
        <div class="flex justify-between max-w-[275px]">
          <div class="flex justify-start w-[135px]">
            <div class="flex justify-between w-[30px]">
              <div>Alt</div>
              <div>:</div>
            </div>
            <span class="w-[10px]"></span>
            <ion-skeleton-text animated class="w-[70%] mr-2" />
          </div>
          <div class="flex justify-start w-[135px]">
            <div class="flex justify-between w-[35px]">
              <div>Az</div>
              <div>:</div>
            </div>
            <span class="w-[10px]"></span>
            <ion-skeleton-text animated class="w-[70%]" />
          </div>
        </div>
      </ion-card-content>
      <div class="flex justify-center my-[10px] mx-[20px]">
        <ion-spinner class="mt-3" name="crescent" />
      </div>
    </ion-card-header>
  </ion-card>
</template>