import { Routing } from '@/components/sections/laravel/Routing'
import { ControllersTutorial } from '@/components/sections/laravel/Controllers'
import { RequestsResponsesTutorial } from '@/components/sections/laravel/RequestsResponses'
import { MiddlewareTutorial } from '@/components/sections/laravel/Middleware'
import { SanctumTutorial } from '@/components/sections/laravel/Sanctum'
import { Validation } from '@/components/sections/laravel/Validation'
import { ErrorHandlingTutorial } from '@/components/sections/laravel/ErrorHandling'
import { Testing } from '@/components/sections/laravel/Testing'
import { SessionsCookies } from '@/components/sections/laravel/SessionsCookies'
import { BladeTemplatesTutorial } from '@/components/sections/laravel/BladeTemplates'
import { EloquentORMTutorial } from '@/components/sections/laravel/EloquentORM'
import { MigrationsSeedersTutorial } from '@/components/sections/laravel/MigrationsSeeders'
import { ScoutSearchTutorial } from '@/components/sections/laravel/ScoutSearch'
import { FileStorageTutorial } from '@/components/sections/laravel/FileStorage'
import { Mail } from '@/components/sections/laravel/Mail'
import { NotificationsTutorial } from '@/components/sections/laravel/Notifications'
import { ReverbWebSockets } from '@/components/sections/laravel/ReverbWebSockets'
import { CollectionsTutorial } from '@/components/sections/laravel/Collections'
import { ServiceContainerTutorial } from '@/components/sections/laravel/ServiceContainer'
import { PennantTutorial } from '@/components/sections/laravel/Pennant'
import { QueuesJobsTutorial } from '@/components/sections/laravel/QueuesJobs'
import { EventsListenersTutorial } from '@/components/sections/laravel/EventsListeners'
import { TaskScheduling } from '@/components/sections/laravel/TaskScheduling'
import { HorizonTutorial } from '@/components/sections/laravel/Horizon'
import { PulseTutorial } from '@/components/sections/laravel/Pulse'
import { NovaTutorial } from '@/components/sections/laravel/Nova'
import { AuthenticationAuthorizationTutorial } from '@/components/sections/laravel/AuthenticationAuthorization'
import { ArtisanConsoleTutorial } from '@/components/sections/laravel/ArtisanConsole'

export default function LaravelGuidePage() {
  return (
    <>
      <h1 className="text-[#FF2D20] border-b-4 border-[#FF2D20] pb-2.5 text-3xl font-bold">
        Laravel Documentation
      </h1>
      <p className="italic">
        The PHP framework for Web Artisans.
      </p>
      <hr className="border-none border-t border-[#ddd] my-10" />
      
      <Routing />
      <ControllersTutorial />
      <RequestsResponsesTutorial />
      <MiddlewareTutorial />
      <SanctumTutorial />
      <Validation />
      <ErrorHandlingTutorial />
      <Testing />
      <SessionsCookies />
      <BladeTemplatesTutorial />
      <EloquentORMTutorial />
      <MigrationsSeedersTutorial />
      <ScoutSearchTutorial />
      <FileStorageTutorial />
      <Mail />
      <NotificationsTutorial />
      <ReverbWebSockets />
      <CollectionsTutorial />
      <ServiceContainerTutorial />
      <PennantTutorial />
      <QueuesJobsTutorial />
      <EventsListenersTutorial />
      <TaskScheduling />
      <HorizonTutorial />
      <PulseTutorial />
      <NovaTutorial />
      <AuthenticationAuthorizationTutorial />
      <ArtisanConsoleTutorial />

      <p className="text-center text-[#666] mt-10">
        <em>Document created for learning purposes. Happy coding!</em>
      </p>
    </>
  )
}
