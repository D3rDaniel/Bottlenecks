<?php

namespace App\Http\Controllers\API;

use App\Models\Priority;

class PriorityController
{
    /**
     * Display all Priorities
     *
     */
    public function index()
    {
        $prios = Priority::get();

        if($prios->isEmpty()){
            return response()->json(['message' => 'No Priorities found'], 404);
        }

        return response()->json([$prios],200);
    }
}
